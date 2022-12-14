## I - Development
Built with Vite, React, TailwindCSS, daisyUI, TypeScript, Eslint.

### Start project on local
- Change the `.env.example` to `.env`
- Start Vite dev server
```yarn
yarn && yarn dev
```

### Release
[Collection](https://second-hand-collection.netlify.app)

### Main Features

1. Filter product `brand` by `brandName` param (<strong>Off-White</strong>). After that, map through products array to
   calculate the discount price by `price_in_cents` and `discountPercent` param, then replace the old price with the
   discount price.

```
const filterByBrandProductList = (brandName, discountPercent) => {
  return products
    .filter((product) => product.brand === brandName)
    .map((product) => {
      // Calculate discount product price by price in cents and discountPercent
      const discountPriceInCent = Math.round(product.price?.price_in_cents * ((100 - discountPercent) / 100));

      return {
        ...product,
        price: {
          ...product.price,
          price_in_cents: discountPriceInCent,
          price: `${discountPriceInCent / 100}${product.price?.currency}`
        },
      }
    });
};
```

2. Create `reverseString` function to reverse the brand name, then map through products array to replace product having
   brand with `brandName` to reversed brand name.

```
const reverseString = (string) => {
  // Split string to string array, reverse elements and join the string again
  return string.split('').reverse().join('');
};

const reversedBrandNameProductList = (brandName) => {
  return products
    .map((product) => (
      product.brand === brandName
        ? {
          ...product,
          brand: reverseString(product.brand)
        }
        : product
    ));
};
```

3. Filter products that having price greater than lowerRange and less than higherRange, and meets shippable country
   condition, then sort the products by ascending price.

```
const getFilteredProductList = (lowerRange, higherRange, shippableCountry) => {
  // Pattern to get only price from string 738.38€ => 738.38
  const pricePattern = /\d+(?:\.\d+)?/g;

  return products
    .filter(({price, shippable_countries}) => {
      const productPrice = price.price.match(pricePattern);

      // Filter products with price in lowerRange to higherRange, and shippable country condition
      return productPrice > lowerRange && productPrice < higherRange && shippable_countries.includes(shippableCountry);
    }).sort(({price: firstPrice}, {price: secondPrice}) => (
      // Sort the products by ascending price
      firstPrice.price_in_cents - secondPrice.price_in_cents
    ));
};
```

4. Use `intervalToDuration` of `date-fns` lib to calculate duration difference from inputDate to current date, then
   format duration to be like <code>X years and X months and X days ago</code>

```
const getPrettyTime = (inputDate) => {
  // Calculate duration difference from inputDate to current date
  const duration = intervalToDuration({
    start: new Date(),
    end: new Date(inputDate)
  });

  const formatOptions = {
    delimiter: " and ",
    format: ["years", "months", "days"]
  };

  return `${formatDuration(duration, formatOptions)} ago`;
};
```

## II - Questions

1. **What metrics are essential in term of Speed ?**

- Page loading time: time it takes for a web page to completely load and display entire content, from the moment a user
  requests it.
- Time to first byte: time it takes for the first byte of each file reaches the user’s browser, after a server
  connection has been established.
- First contentful paint: time it takes to render the first content of the webpage, which can be anything like header,
  menu or some text.
- Time to interact: time it takes to be able to perform an action on the webpage.
- Page weight: the amount of bytes server needs to sent to browser to display entire web page content.

2. **Can you name ways to increase speed (perceived or actual load time) ?**

- Compress & use optimal image format (jpg, webp), lazy load image.
- Bundle and minify CSS, JS.
- Use multiple chunk files: by apply code splitting (lazy load components, lazy load routes) to load them on demand or
  resource splitting (chunk CSS, JS).
- Memoize components, use memoization hooks like useMemo or useCallback to prevent unnecessary re-renders.
- Use CDN (CloudFlare, CloudFront) and caching.
- Enable Gzip on web server.
- Use web workers for CPU heavy tasks.

3. **Could you tell me what are SSR, pre-rendering and Dynamic rendering ?**

- SSR is stand for server-side rendering, in which the web page HTML will be generated on the server,
  then send the rendered page in response to browser for display.
- Pre-rendering is the process to generate the static HTML in advance, in order to make the website SEO friendly,
  including static site generation and server-side rendering.
- Dynamic rendering is the process in which the server-side rendered version of website is sent to search engine
  bots, and the client-side version is sent to the users.

4. **You have a bug to fix, you find the file(s) where the bug occurs, the code is a mess, what do you do ?**

- First, read the bug report specification carefully, to understand the issue, how to reproduce, expected result.
- Reference on the git commit history on this file, to check if there are any recent changes that could relate to the
  bug.
- Try to isolate the code part which is suspicious, by watching the value using these method:
  - Debugging tools like React devtools.
  - Print value to console, or write to log files
  - Set breakpoint combined with debugger
- Once find out which function/value is the root cause, compare it to the expected result and make the fix.
- Check again and correct the test case if the assertions is failed due to the new fixes.

5. **What represent FrontEnd to you ?**

- FrontEnd is simply the things that users can see and interact when they visit the website, which could be something
  familiar like text, images, input form, colors, menus, buttons, tables,... or actions like hover effects on
  button, loading animations, navigate the web page by clicking on dropdown menu...

6. **What was the last technical challenge you faced and how you did you handle it ?**

- Bugs reported when user typing in the search input: duplicated result items were displayed, or no items were displayed
  even though the response have some items. I tried to reproduce and found out that the root cause coming from the
  infinite scroll, which will combine new search results with the current list when scrolling down, and the list will be
  reset when user change the search input. But thing is, the list might not be reset in time or combine incorrectly
  regarding the input type speed of user.
- I handle this bug by applying debounce the input changes 300ms, also applying `axios cancel token` when calling
  api, to prevent for any duplicated requests.

7. **What is the next language/framework/stack you want to learn this year and why ?**

- Go. Since I used to learn and utilize PHP in the past, Go is a really suitable choice, also when looking through
  vacancies, I can usually see the combinations of PHP/Go.
- Go is also easy to learn, fast, scalable and got lots of packages to help the development more simple.
- Go also has lots of job opportunities with a good average salary.
