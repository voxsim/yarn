/* @flow */

import {entries} from './util/misc.js';
import * as resolvers from './resolvers/index.js';

export function getExoticResolver(pattern: string): ?Function {
  // TODO make this type more refined
  for (const [, Resolver] of entries(resolvers.exotics)) {
    if (Resolver.isVersion(pattern)) {
      return Resolver;
    }
  }

  return null;
}

/**
 * Explode and normalize a pattern into it's name and range.
 */

export function normalizePattern(
  pattern: string,
): {
  hasVersion: boolean,
  name: string,
  range: string,
} {
  let hasVersion = false;
  let range = 'latest';
  let name = pattern;

  // if we're a scope then remove the @ and add it back later
  let isScoped = false;
  if (name[0] === '@') {
    isScoped = true;
    name = name.slice(1);
  }

  // take first part as the name
  const parts = name.split('@');
  if (parts.length > 1) {
    name = parts.shift();
    range = parts.join('@');

    if (range) {
      hasVersion = true;
    } else {
      range = '*';
    }
  }

  // add back @ scope suffix
  if (isScoped) {
    name = `@${name}`;
  }

  return {name, range, hasVersion};
}
