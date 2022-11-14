import type { App } from 'vue';
import version from './version';
import * as all from './packages/components';
import { COMPONENT_PREFIX } from './packages/_utils/constants';

type ComponentType = any;

export interface UiInstance {
  version: string;
  componentPrefix: string;
  install: (app: App) => void;
}

interface UiCreateOptions {
  components?: ComponentType[];
  componentPrefix?: string;
}

function create({
  componentPrefix = COMPONENT_PREFIX,
  components = Object.values(all)
}: UiCreateOptions = {}): UiInstance {
  const installTargets: App[] = [];

  function registerComponent(app: App, name: string, component: ComponentType) {
    const registered = app.component(componentPrefix + name);
    if (!registered && component.install) {
      component.install(app);
    }
  }

  function install(app: App): void {
    if (installTargets.includes(app)) {
      return;
    }
    installTargets.push(app);
    components.forEach((component) => {
      const { name, alias } = component;
      registerComponent(app, name, component);
      if (alias) {
        alias.forEach((aliasName: string) => {
          registerComponent(app, aliasName, component);
        });
      }
    });
  }

  return {
    version,
    componentPrefix,
    install,
  };
}

export default create;
