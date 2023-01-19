# recma-mdx-displayname

Recma plugin to enable detecting MDXContent elements in production.

Compatible with [MDX](https://mdxjs.com/) and [Next.js](https://nextjs.org/). You can use this plugin to conditionally render additional content depending on whether a child component is an MDX page or not (for example, adding default MDX-only layout or styles to your `_app.tsx`).

## Usage

Install the plugin:

```bash
npm install recma-mdx-displayname
```

Enable it in your `next.config.js`:

```js
const withMDX = require("@next/mdx")({
  options: {
    // add it here!
    recmaPlugins: [require("recma-mdx-displayname")]
  }
})

const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
}

module.exports = withMDX(nextConfig)
```

Use the `.displayName` property to test components, for example in `_app.tsx`:

```tsx
import "../styles/globals.css"
import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
  // Use Component.displayName to check for MDXContent
  // MDX pages have default styles applied and a header
  if (Component.displayName === "MDXContent") {
    return (
      <div className="mdx-content">
        <header>
          <h1>My blog</h1>
        </header>
        <Component {...pageProps} />
      </div>
    )
  }

  // Other pages are rendered directly
  return <Component {...pageProps} />
}
```
