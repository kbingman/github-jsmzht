import fetch from 'isomorphic-unfetch';
import { fetchRedditApi, sanitizeString, formatListings } from './index';

describe('reddit api', () => {
  test('it works', async () => {
    const fetch = jest.fn();
    fetch.mockReturnValue({
      json: () => [
        {
          kind: 'Listing',
          data: {
            modhash: '',
            dist: 1,
            children: [],
            after: null,
            before: null
          }
        },
        {
          kind: 'Listing',
          data: {
            modhash: '',
            dist: null,
            children: [],
            after: null,
            before: null
          }
        }
      ]
    });
    const listings = await fetchRedditApi(fetch);
    console.log(listings);
    expect(fetch).toHaveBeenCalledWith(
      'https://www.reddit.com/r/TheCulture/comments/megvqx/which_culture_ship_name_would_best_replace_the.json'
    );
  });
});

describe('sanitize string', () => {
  test('filter stars', () => {
    expect(sanitizeString('whatever* we want')).toBe('whatever we want');
  });
  test('filter underscores', () => {
    expect(sanitizeString('whatever_ we want')).toBe('whatever we want');
  });
});

describe('format listings', () => {
  test('formats data with stars', () => {
    const result = formatListings([
      {
        kind: 't1',
        data: {
          body: 'GCU *Pure Big Mad Boat Man*',
          permalink: 'https://example.com'
        }
      }
    ]);
    expect(result).toEqual(['GCU Pure Big Mad Boat Man']);
  });
});

// body: 'GCU *Pure Big Mad Boat Man*'
