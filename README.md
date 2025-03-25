The Str18ng Loader package provides access to your string translations from your [Str18ng][str18ng] account.

## Installation

Install the package with your manager of choice

```sh
npm install str18ng-loader
```

## Usage

For str18ng-loader to work you need to create an access key in your Str18ng account for the project you want to link.

### Option 1 - Environment variable

Create an environment variable called `STR18NG_ACCESS_TOKEN`

Add a script to your package.json file

```json
{
  "scripts": {
    "download-translations": "str18ng --format json --output ./lang"
  }
}
```

The package will automatically pick up the environment variable and download the translations to the specified folder.

### Option 2 - Declare token in package.json

Add a `str18ng` key to your package.json file

```json
{
  "scripts": {
    "str18ng:download": "str18ng --format json --output ./lang --token [your-access-key]"
  }
}
```
Then run the script to download your translation files:

```sh
npm run str18ng:download
```

| Option   | Default | Description                                                                                                                                                                                                                                      |
|----------|---------| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `format` | `json`  | `json` `csv` `arb` The format of your files |
| `output` | `./`    | The path of the directory you want the files downloaded to|
| `token`  | `null`  | (Optional) The access key from your Str18ng account|


[str18ng]: https://str18ng.com