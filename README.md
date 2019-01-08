# Portalize

Symbolic Link Management Tool

## CLI Usage

Use the CLI to setup the linkgs between your directories. You should have a configuration file (JSON format).
```
[
  {
    "path": "portal",
    "name": "main"
  },
  {
    "path": "./test/portal",
    "name": "test"
  }
]
```

The `main` module is mandatory.

### init

Run `portalize init <config_path>` to initialize the portals.
The module directories should exist and will not be created by `portalize`.

```shell
$> portalize init ./portalize.config.json

[+] Creating main module directory at <current_directory>/portal
[+] Creating test module link at <current_directory>/test/portal
[+] Creating test module directory at <current_directory>/portal/test
[+] Saving configuration at <current_directory>/portal/config.json
[+] Creating event directory at <current_directory>/portal/.events
```

### dismantle

Run `portalize dismantle <config_path>` to remove all trace of `portalize`.

```shell
$> portalize dismantle ./portalize.config.json

[-] Removing test module link at <current_directory>/test/portal
[-] Removing main module directory at <current_directory>/portal
```

### info

Run `portalize info <config_path>` to check if all portals are present.

```shell
$> portalize info ./portalize.config.json

[i] main module directory exists at <current_directory>/portal
[i] test module link exists at <current_directory>/test/portal
```

You can then use the `Portalize` class in your code to `add`, `set`, `get` and `rm` data from the shared directories.
You can also use the `requires` method to check if an event has already occured. Useful when deploying something,
instead of passing informations between repositories through your env, use files and events in `portalize` to set informations about an action, and check if an action has been done previously.

## API Reference

### Classes

* [Portalize](classes/portalize.md)

### Interfaces

* [CallConfig](interfaces/callconfig.md)
* [Event](interfaces/event.md)
* [Requirement](interfaces/requirement.md)

---

