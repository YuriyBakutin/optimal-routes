# Об этой папке и об особенностях сборки

## Components

**Components** — это папка, настроенная так, что при размещении в ней компонентов, они автоматически становятся глобальными и не требуют импорта и регистрации.

Такое поведение обеспечивается плагином [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components).

## Методы Vue (ref, computed, watch, watchEffect и т.п.)

Методы Vue определены, как глобальные, и не требуют импортов. Это обеспечивается плагином [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)

## Icons

Можно использовать в качестве компонента любую пиктограмму из набора [Iconify](https://iconify.design/).

Эту возможность обеспечивает плагин [unplugin-icons](https://github.com/antfu/unplugin-icons).
