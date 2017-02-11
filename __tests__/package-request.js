/* @flow */
/* eslint max-len: 0 */

import PackageRequest from '../src/package-request.js';
import * as resolvers from '../src/resolvers/index.js';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

function addTest(pattern, expectedResolver) {
  test(`${expectedResolver.name} resolves ${pattern}`, () => {
    const actualResolver = PackageRequest.getExoticResolver(pattern);
    expect(actualResolver).toBeDefined();
    if (actualResolver) {
      expect(actualResolver.name).toEqual(expectedResolver.name);
    }
  });
}

addTest('https://git@github.com/stevemao/left-pad.git', resolvers.exotics['git']);
// git:
// git+ssh:
addTest('git+https://github.com/npm-ml/ocaml.git#npm-4.02.3', resolvers.exotics['git']);
addTest('git+https://github.com/npm-ml/ocaml.git#npm-4.02.3', resolvers.exotics['git']);
// ssh:
addTest('https://github.com/npm-ml/re', resolvers.exotics['git']);
// gitlab.com
// bitbucket.com
addTest('https://bitbucket.org/hgarcia/node-bitbucket-api', resolvers.exotics['git']);
addTest('https://github.com/yarnpkg/yarn/releases/download/v0.18.1/yarn-v0.18.1.tar.gz', resolvers.exotics['tarball']);
// github:
// github shortand ?
// file:
addTest('gitlab:leanlabsio/kanban', resolvers.exotics['gitlab']);
addTest('gist:d59975ac23e26ad4e25b', resolvers.exotics['gist']);
addTest('bitbucket:hgarcia/node-bitbucket-api', resolvers.exotics['bitbucket']);
