import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
const Post = styled.article`
  box-shadow: 0px 3px 10px rgba(25, 17, 34, 0.05);
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  a {
    color: #000;
    text-decoration: none;
  }
  p {
    font-size: 0.8rem;
  }
  h2 {
    margin-bottom: 0;
  }
  .readMore {
    font-family: Futura PT, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
      Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, Arial,
      sans-serif;
    font-size: 0.8rem;
    text-transform: uppercase;
    border-bottom: 1px solid #e0d6eb;
    box-shadow: inset 0 -2px 0px 0px #e0d6eb;
    transition: all 100ms cubic-bezier(0.4, 0, 0.2, 1);
    &:hover {
      color: purple;
    }
  }
`

const LISTING_QUERY = graphql`
  query BlogPostListing {
    allMarkdownRemark(
      limit: 10
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          excerpt
          frontmatter {
            title
            slug
            date(formatString: "MMM DD, YYYY")
          }
        }
      }
    }
  }
`

const Listing = () => (
  <StaticQuery
    query={LISTING_QUERY}
    render={({ allMarkdownRemark }) =>
      allMarkdownRemark.edges.map(({ node }) => (
        <Post key={node.frontmatter.slug}>
          <h2>
            <Link to={`/posts${node.frontmatter.slug}`}>
              {node.frontmatter.title}
            </Link>
          </h2>
          <p>{node.frontmatter.date}</p>
          <p>{node.excerpt}</p>
          <Link class="readMore" to={`/posts${node.frontmatter.slug}`}>
            Read More
          </Link>
        </Post>
      ))
    }
  />
)

export default Listing
