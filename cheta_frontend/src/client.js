import sanityClient from '@sanity/client';
import imgUrlBuilder from '@sanity/image-url';



// SANITY CLIENT SIDE

export const client = sanityClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2021-11-16',
  useCdn: true,
  token: process.env.REACT_APP_SANITY_PROJECT_TOKEN,
});



const builder = imgUrlBuilder(client);

export const urlFor = ( source ) => builder.image(source)





// import sanityClient from '@sanity/client';
// import imgUrlBuilder from '@sanity/image-url';


// // SANITY CLIENT SIDE

// export const client = sanityClient({
//   projectId: 'tv8vacoa',
//   dataset: 'production',
//   apiVersion: '2022-7-4',
//   useCdn: true,
//   token: 'skAufIel5aQ3oa4Tm798LV5DNnYEaOlVb9FaYEZvXrbaFFFsGhURptbolrBVScbNnsOU8Z1TXi39xkDWCUr12NQN4d40f7D41SD0SL1PjuhlGH5TnrxxGg7kEeeFqwdkZcoKb2xwg70X0JvvBFLwusuWAwRLC8JWkX5oOG2c86cLAlxhFxmG',
// });



// const builder = imgUrlBuilder(client);

// export const urlFor = ( source ) => builder.image(source)