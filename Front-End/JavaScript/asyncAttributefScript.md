```html
<script src = "xxx.js" async></script>
```
## Definition and Usage
The async attribute is a boolean attribute.

If the async attribute is set, the script is downloaded in parallel to parsing the page, and executed as soon as it is available. The parsing of the page is interrupted once the script is downloaded completely, and then the script is executed, before the parsing of the rest of the page continues.

**Note**: The async attribute is only for external scripts (and should only be used if the src attribute is present).

**Note**: There are several ways an external script can be executed:

If async is present: The script is downloaded in parallel to parsing the page, and executed as soon as it is available (before parsing completes)
If defer is present (and not async): The script is downloaded in parallel to parsing the page, and executed after the page has finished parsing
If neither async or defer is present: The script is downloaded and executed immediately, blocking parsing until the script is completed