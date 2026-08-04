export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const ProjectsPartsFragmentDoc = gql`
    fragment ProjectsParts on Projects {
  __typename
  items {
    __typename
    slug
    title
    summary
    description
    image
    imageKind
    year
    category
    tech
    longDescription
    features
    outcomes
    metrics {
      __typename
      label
      value
    }
    role
    duration
    client
    links {
      __typename
      demo
      repo
    }
  }
}
    `;
export const ServicesPartsFragmentDoc = gql`
    fragment ServicesParts on Services {
  __typename
  services {
    __typename
    slug
    icon
    title
    summary
    description
    features
    tech
  }
  capabilities {
    __typename
    icon
    title
    description
    tags
  }
}
    `;
export const TeamPartsFragmentDoc = gql`
    fragment TeamParts on Team {
  __typename
  members {
    __typename
    name
    role
    bio
    avatar
    technologies
  }
}
    `;
export const TestimonialsPartsFragmentDoc = gql`
    fragment TestimonialsParts on Testimonials {
  __typename
  items {
    __typename
    id
    name
    company
    role
    comment
    rating
    projectTitle
    avatar
  }
}
    `;
export const ProjectsDocument = gql`
    query projects($relativePath: String!) {
  projects(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ProjectsParts
  }
}
    ${ProjectsPartsFragmentDoc}`;
export const ProjectsConnectionDocument = gql`
    query projectsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ProjectsFilter) {
  projectsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ProjectsParts
      }
    }
  }
}
    ${ProjectsPartsFragmentDoc}`;
export const ServicesDocument = gql`
    query services($relativePath: String!) {
  services(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ServicesParts
  }
}
    ${ServicesPartsFragmentDoc}`;
export const ServicesConnectionDocument = gql`
    query servicesConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ServicesFilter) {
  servicesConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ServicesParts
      }
    }
  }
}
    ${ServicesPartsFragmentDoc}`;
export const TeamDocument = gql`
    query team($relativePath: String!) {
  team(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...TeamParts
  }
}
    ${TeamPartsFragmentDoc}`;
export const TeamConnectionDocument = gql`
    query teamConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: TeamFilter) {
  teamConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...TeamParts
      }
    }
  }
}
    ${TeamPartsFragmentDoc}`;
export const TestimonialsDocument = gql`
    query testimonials($relativePath: String!) {
  testimonials(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...TestimonialsParts
  }
}
    ${TestimonialsPartsFragmentDoc}`;
export const TestimonialsConnectionDocument = gql`
    query testimonialsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: TestimonialsFilter) {
  testimonialsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...TestimonialsParts
      }
    }
  }
}
    ${TestimonialsPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    projects(variables, options) {
      return requester(ProjectsDocument, variables, options);
    },
    projectsConnection(variables, options) {
      return requester(ProjectsConnectionDocument, variables, options);
    },
    services(variables, options) {
      return requester(ServicesDocument, variables, options);
    },
    servicesConnection(variables, options) {
      return requester(ServicesConnectionDocument, variables, options);
    },
    team(variables, options) {
      return requester(TeamDocument, variables, options);
    },
    teamConnection(variables, options) {
      return requester(TeamConnectionDocument, variables, options);
    },
    testimonials(variables, options) {
      return requester(TestimonialsDocument, variables, options);
    },
    testimonialsConnection(variables, options) {
      return requester(TestimonialsConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "http://localhost:3002/graphql",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
