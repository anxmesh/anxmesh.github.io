import type { Project, ReadingEntryData, SiteConfig } from "@/types";

// ============================================================
// Validation Utilities
// Build-time validation for content data integrity
// ============================================================

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

// --- Helper functions ---

function assertString(
  value: unknown,
  fieldName: string,
  context: string
): asserts value is string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new ValidationError(
      `Error: ${context} missing required field: ${fieldName}`
    );
  }
}

function assertMaxLength(
  value: string,
  maxLength: number,
  fieldName: string,
  context: string
): void {
  if (value.length > maxLength) {
    throw new ValidationError(
      `Error: ${context} has invalid ${fieldName}: exceeds maximum length of ${maxLength} characters (got ${value.length})`
    );
  }
}

function assertMaxWords(
  value: string,
  maxWords: number,
  fieldName: string,
  context: string
): void {
  const wordCount = value.trim().split(/\s+/).length;
  if (wordCount > maxWords) {
    throw new ValidationError(
      `Error: ${context} has invalid ${fieldName}: exceeds maximum of ${maxWords} words (got ${wordCount})`
    );
  }
}

function assertArrayBounds(
  arr: unknown[],
  min: number,
  max: number,
  fieldName: string,
  context: string
): void {
  if (arr.length < min || arr.length > max) {
    throw new ValidationError(
      `Error: ${context} has invalid ${fieldName}: expected ${min}–${max} items, got ${arr.length}`
    );
  }
}

function assertArray(
  value: unknown,
  fieldName: string,
  context: string
): asserts value is unknown[] {
  if (!Array.isArray(value)) {
    throw new ValidationError(
      `Error: ${context} missing required field: ${fieldName}`
    );
  }
}

// --- Project Validation ---

export function validateProject(data: unknown, filename: string): Project {
  const context = `Project '${filename}'`;

  if (typeof data !== "object" || data === null) {
    throw new ValidationError(`Error: ${context} is not a valid object`);
  }

  const d = data as Record<string, unknown>;

  // Required string fields
  assertString(d.slug, "slug", context);
  assertString(d.title, "title", context);
  assertString(d.description, "description", context);
  assertString(d.shortDescription, "shortDescription", context);
  assertString(d.role, "role", context);
  assertString(d.timeline, "timeline", context);
  assertString(d.thumbnail, "thumbnail", context);

  // Length constraints
  assertMaxLength(d.title as string, 100, "title", context);
  assertMaxLength(d.description as string, 300, "description", context);
  assertMaxLength(d.shortDescription as string, 120, "shortDescription", context);

  // contentType enum
  if (d.contentType !== "minimal" && d.contentType !== "case-study") {
    throw new ValidationError(
      `Error: ${context} has invalid contentType: must be "minimal" or "case-study", got "${d.contentType}"`
    );
  }

  // displayOrder
  if (
    typeof d.displayOrder !== "number" ||
    !Number.isInteger(d.displayOrder) ||
    d.displayOrder < 1
  ) {
    throw new ValidationError(
      `Error: ${context} has invalid displayOrder: must be a positive integer, got ${d.displayOrder}`
    );
  }

  // tools array
  assertArray(d.tools, "tools", context);
  assertArrayBounds(d.tools as unknown[], 1, 10, "tools", context);
  for (const tool of d.tools as unknown[]) {
    if (typeof tool !== "string" || tool.trim().length === 0) {
      throw new ValidationError(
        `Error: ${context} has invalid tools: each tool must be a non-empty string`
      );
    }
  }

  // images array
  assertArray(d.images, "images", context);
  assertArrayBounds(d.images as unknown[], 1, 20, "images", context);
  for (const img of d.images as unknown[]) {
    if (typeof img !== "object" || img === null) {
      throw new ValidationError(
        `Error: ${context} has invalid images: each image must be an object with src and alt`
      );
    }
    const image = img as Record<string, unknown>;
    assertString(image.src, "images[].src", context);
    assertString(image.alt, "images[].alt", context);
    assertMaxLength(image.alt as string, 150, "images[].alt", context);
  }

  // Case study conditional fields
  if (d.contentType === "case-study") {
    // Accept either legacy fields (problem/process/solution) or rich fields (approach/outcome)
    const hasLegacy = d.process !== undefined;
    const hasRich = d.approach !== undefined || d.outcome !== undefined;
    if (!hasLegacy && !hasRich) {
      assertString(d.problem, "problem", context);
      assertString(d.process, "process", context);
      assertString(d.solution, "solution", context);
    }
  }

  // Optional externalLink
  if (d.externalLink !== undefined && typeof d.externalLink !== "string") {
    throw new ValidationError(
      `Error: ${context} has invalid externalLink: must be a string`
    );
  }

  return {
    slug: d.slug as string,
    title: d.title as string,
    description: d.description as string,
    shortDescription: d.shortDescription as string,
    role: d.role as string,
    timeline: d.timeline as string,
    tools: d.tools as string[],
    thumbnail: d.thumbnail as string,
    contentType: d.contentType as "minimal" | "case-study",
    displayOrder: d.displayOrder as number,
    externalLink: d.externalLink as string | undefined,
    images: (d.images as Record<string, unknown>[]).map((img) => ({
      src: img.src as string,
      alt: img.alt as string,
      caption: img.caption as string | undefined,
    })),
    problem: d.problem as string | undefined,
    process: d.process as string | undefined,
    solution: d.solution as string | undefined,
    category: d.category as string | undefined,
    subtitle: d.subtitle as string | undefined,
    team: d.team as string | undefined,
    stakeholders: d.stakeholders as string | undefined,
    duration: d.duration as string | undefined,
    metrics: Array.isArray(d.metrics) ? (d.metrics as { label: string; value: string }[]) : undefined,
    approach: d.approach as string | undefined,
    outcome: d.outcome as string | undefined,
    whyItMattered: d.whyItMattered as string | undefined,
  };
}

// --- Reading List Validation ---

export function validateReadingList(data: unknown): ReadingEntryData[] {
  if (typeof data !== "object" || data === null) {
    throw new ValidationError("Error: Reading list data is not a valid object");
  }

  const d = data as Record<string, unknown>;

  if (!Array.isArray(d.entries)) {
    throw new ValidationError(
      "Error: Reading list missing required field: entries"
    );
  }

  assertArrayBounds(d.entries, 0, 50, "entries", "Reading list");

  return d.entries.map((entry: unknown, index: number) => {
    const context = `Reading entry [${index}]`;

    if (typeof entry !== "object" || entry === null) {
      throw new ValidationError(`Error: ${context} is not a valid object`);
    }

    const e = entry as Record<string, unknown>;

    assertString(e.title, "title", context);
    assertString(e.author, "author", context);
    assertString(e.note, "note", context);
    assertMaxLength(e.note as string, 300, "note", context);

    if (e.type !== "book" && e.type !== "article") {
      throw new ValidationError(
        `Error: ${context} has invalid type: must be "book" or "article", got "${e.type}"`
      );
    }

    if (e.url !== undefined && typeof e.url !== "string") {
      throw new ValidationError(
        `Error: ${context} has invalid url: must be a string`
      );
    }

    return {
      title: e.title as string,
      author: e.author as string,
      note: e.note as string,
      type: e.type as "book" | "article",
      url: e.url as string | undefined,
      displayOrder: e.displayOrder as number | undefined,
    };
  });
}

// --- Site Config Validation ---

export function validateSiteConfig(data: unknown): SiteConfig {
  const context = "Site config";

  if (typeof data !== "object" || data === null) {
    throw new ValidationError(`Error: ${context} is not a valid object`);
  }

  const d = data as Record<string, unknown>;

  // name
  assertString(d.name, "name", context);

  // hero
  if (typeof d.hero !== "object" || d.hero === null) {
    throw new ValidationError(`Error: ${context} missing required field: hero`);
  }
  const hero = d.hero as Record<string, unknown>;
  assertString(hero.heading, "hero.heading", context);
  assertMaxLength(hero.heading as string, 80, "hero.heading", context);
  assertString(hero.tagline, "hero.tagline", context);
  assertMaxLength(hero.tagline as string, 150, "hero.tagline", context);

  // Optional rotatingPhrases
  let rotatingPhrases: string[] | undefined;
  if (hero.rotatingPhrases !== undefined) {
    assertArray(hero.rotatingPhrases, "hero.rotatingPhrases", context);
    rotatingPhrases = hero.rotatingPhrases as string[];
  }

  // about
  if (typeof d.about !== "object" || d.about === null) {
    throw new ValidationError(
      `Error: ${context} missing required field: about`
    );
  }
  const about = d.about as Record<string, unknown>;
  assertString(about.bio, "about.bio", context);
  assertMaxWords(about.bio as string, 200, "about.bio", context);
  assertArray(about.highlights, "about.highlights", context);
  assertArrayBounds(
    about.highlights as unknown[],
    3,
    20,
    "about.highlights",
    context
  );
  for (const h of about.highlights as unknown[]) {
    if (typeof h !== "object" || h === null) {
      throw new ValidationError(
        `Error: ${context} has invalid about.highlights: each highlight must have label and value`
      );
    }
    const highlight = h as Record<string, unknown>;
    assertString(highlight.label, "about.highlights[].label", context);
    assertString(highlight.value, "about.highlights[].value", context);
  }

  // contact
  if (typeof d.contact !== "object" || d.contact === null) {
    throw new ValidationError(
      `Error: ${context} missing required field: contact`
    );
  }
  const contact = d.contact as Record<string, unknown>;
  assertString(contact.cta, "contact.cta", context);
  assertMaxLength(contact.cta as string, 150, "contact.cta", context);
  assertString(contact.email, "contact.email", context);
  assertArray(contact.socials, "contact.socials", context);
  assertArrayBounds(
    contact.socials as unknown[],
    1,
    6,
    "contact.socials",
    context
  );
  for (const s of contact.socials as unknown[]) {
    if (typeof s !== "object" || s === null) {
      throw new ValidationError(
        `Error: ${context} has invalid contact.socials: each social must have platform and url`
      );
    }
    const social = s as Record<string, unknown>;
    assertString(social.platform, "contact.socials[].platform", context);
    assertString(social.url, "contact.socials[].url", context);
  }

  // navigation
  assertArray(d.navigation, "navigation", context);
  for (const n of d.navigation as unknown[]) {
    if (typeof n !== "object" || n === null) {
      throw new ValidationError(
        `Error: ${context} has invalid navigation: each link must have label, href, and number`
      );
    }
    const nav = n as Record<string, unknown>;
    assertString(nav.label, "navigation[].label", context);
    assertString(nav.href, "navigation[].href", context);
    if (typeof nav.number !== "number") {
      throw new ValidationError(
        `Error: ${context} has invalid navigation[].number: must be a number`
      );
    }
  }

  return {
    name: d.name as string,
    hero: {
      heading: hero.heading as string,
      tagline: hero.tagline as string,
      rotatingPhrases: rotatingPhrases,
    },
    about: {
      bio: about.bio as string,
      highlights: (about.highlights as Record<string, unknown>[]).map((h) => ({
        label: h.label as string,
        value: h.value as string,
      })),
      photo: about.photo as string | undefined,
    },
    contact: {
      cta: contact.cta as string,
      email: contact.email as string,
      socials: (contact.socials as Record<string, unknown>[]).map((s) => ({
        platform: s.platform as string,
        url: s.url as string,
        icon: s.icon as string | undefined,
      })),
    },
    navigation: (d.navigation as Record<string, unknown>[]).map((n) => ({
      label: n.label as string,
      href: n.href as string,
      number: n.number as number,
    })),
  };
}

// --- Cross-project validation ---

export function validateProjectCollection(projects: Project[]): void {
  // Check count bounds
  if (projects.length < 1 || projects.length > 10) {
    throw new ValidationError(
      `Error: Project count (${projects.length}) outside allowed range [1, 10]`
    );
  }

  // Check displayOrder uniqueness
  const orderMap = new Map<number, string[]>();
  for (const project of projects) {
    const existing = orderMap.get(project.displayOrder) || [];
    existing.push(project.slug);
    orderMap.set(project.displayOrder, existing);
  }

  for (const [order, slugs] of orderMap) {
    if (slugs.length > 1) {
      throw new ValidationError(
        `Error: Duplicate displayOrder ${order} in projects: ${slugs.join(", ")}`
      );
    }
  }
}
