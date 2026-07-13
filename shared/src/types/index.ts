export type ApiResponse = {
  message: string;
  success: true;
}

export type CountryResponse = {
  data: {
    objects: Country[];
    meta: {
      total: number;
      count: number;
      limit: number;
      offset: number;
      more: boolean;
    };
  };
};

export type Country = {
  // Names
  names: {
    common: string;
    official: string;
    native: Record<string, { common: string; official: string }>;
    translations: Record<string, { common: string; official: string }>;
  };

  // Identifiers
  codes: {
    alpha_2: string;
    alpha_3: string;
    ccn3: string;
    cioc?: string;
  };

  // Geography
  capitals: {
    name: string;
    coordinates: { lat: number; lng: number };
  }[];
  region: string;
  subregion: string;
  continents: string[];
  area: { kilometers: number; miles: number };
  coordinates: { lat: number; lng: number };
  landlocked: boolean;
  borders: string[];

  // Flag
  flag: {
    emoji: string;
    url_png: string;
    url_svg: string;
    description: string;
  };

  // Identity & Culture
  languages: {
    name: string;
    native_name?: string;
    iso639_1?: string;
    bcp47?: string;
  }[];
  currencies: {
    code: string;
    name: string;
    symbol: string;
  }[];
  demonyms: Record<string, { f: string; m: string }>;

  // Statistics & Infrastructure
  population: number;
  timezones: string[];
  tlds: string[];
  calling_codes: string[];
  postal_code?: {
    format: string;
    regex: string;
  };

  // Classification
  classification: {
    sovereign: boolean;
    un_member: boolean;
    disputed: boolean;
  };

  // External Links
  links: {
    google_maps: string;
    wikipedia: string;
    open_street_maps: string;
  };
};
