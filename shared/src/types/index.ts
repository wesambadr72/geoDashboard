export type ApiResponse = {
  message: string;
  success: true;
}

export type CountryResponse = {
  data: {
    objects: Country[] | string[];
    meta: {
      total: number;
      count: number;
      limit: number;
      offset: number;
      more: boolean;
    };
  };
};

export const TOP_COUNTRY_CODES = [
  "US", "CN", "IN", "BR", "RU", "JP", "DE", "FR", "GB", "IT",
  "CA", "AU", "SA", "EG", "AE", "TR", "ID", "PK", "NG", "ZA",
  "MX", "ES", "KR", "VN", "TH", "AR", "PL", "NL", "BE", "CH",
  "SE", "NO", "DK", "FI", "IE", "PT", "GR", "AT", "MY", "PS",
  "PH", "SG", "NZ", "CL", "CO", "PE", "DZ", "MA", "TN", "JO",
  "LB", "KW", "QA", "OM", "BH", "IQ", "LY", "SD", "YE", "SY",
  "KZ", "UZ", "UA", "RO", "CZ", "HU", "SK", "HR", "RS", "BG",
  "EE", "LV", "LT", "LU", "CY", "MT", "IS", "ET", "KE", "TZ",
  "UG", "GH", "CI", "SN", "CM", "AO", "BD", "LK", "MM", "KH",
  "LA", "AF", "NP", "UZ", "AZ", "GE", "AM", "MN", "CU", "PA","TH","NR"
];

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
  economy?: {
    gini_coefficient?: Record<string, number>;
  };
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
    iso_status?: string;
  };

  // External Links
  links: {
    google_maps: string;
    wikipedia: string;
    open_street_maps: string;
  };
};
