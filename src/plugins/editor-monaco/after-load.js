import { initialize as initializeMonacoServices } from 'vscode/services';
import { IExtensionService } from 'vscode/vscode/vs/workbench/services/extensions/common/extensions';
import { registerServiceInitializeParticipant } from 'vscode/lifecycle';
import 'vscode/localExtensionHost';

import lazyMonacoContribution from './monaco-contribution/index.js';

function afterLoad(system) {
  const InitPhase = {
    UNINITIALIZED: 'UNINITIALIZED',
    IN_PROGRESS: 'IN_PROGRESS',
    INITIALIZED: 'INITIALIZED',
  };

  // setup monaco environment
  globalThis.MonacoEnvironment = {
    initPhase: InitPhase.UNINITIALIZED,
    baseUrl: document.baseURI || location.href, // eslint-disable-line no-restricted-globals
    getWorkerUrl() {
      return new URL(process.env.REACT_APP_APIDOM_WORKER_FILENAME, this.baseUrl).toString();
    },
    ...globalThis.MonacoEnvironment, // this will allow to override the base uri for loading Web Workers
  };

  /**
   * Monaco standalone services can be initialized only once.
   * Standalone services cannot be disposed of when no longer needed.
   * Individual services can be disposed of separately, but if one decides
   * to do that, `initialize` function will not able to initialize them again.
   *
   * Extensions needs to initialized explicitly as well.
   */
  if (globalThis.MonacoEnvironment.initPhase === InitPhase.UNINITIALIZED) {
    globalThis.MonacoEnvironment.initPhase = InitPhase.IN_PROGRESS;

    (async () => {
      try {
        // @TODO(vladimir.gorej@gmail.com): this can go away with next release of vscode >1.83.15
        // GitHub issue: https://github.com/CodinGame/monaco-vscode-api/issues/283
        registerServiceInitializeParticipant((accessor) => accessor.get(IExtensionService));
        await initializeMonacoServices({});
        system.monacoInitializationDeferred().resolve();
      } catch (error) {
        system.monacoInitializationDeferred().reject(error);
      } finally {
        globalThis.MonacoEnvironment.initPhase = InitPhase.INITIALIZED;
      }
    })();

    lazyMonacoContribution({ system });
  }
}

export default afterLoad;
