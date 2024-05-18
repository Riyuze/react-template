# Pages

### Title and Meta Tags
default Title and Meta Tags is at `public/index.html` file. If you need to dynamically update the page title and meta tag based on the page, you can use `react-helmet`
example: 

src/pages/index.tsx
```
import {Helmet} from 'react-helmet';

function HomePage(){
  return (
    <>
      <Helmet>
        <title> Home | OCBC NISP </title>
        <meta name="description" content="Meta description for home page">
      </Helmet>
      <div>
      <h1> Home </h1>
      </div>
    </>
  )
}

export default HomePage;

```
