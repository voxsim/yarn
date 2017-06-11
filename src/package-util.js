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
};
