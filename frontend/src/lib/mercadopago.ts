export interface MercadoPagoPreference {
  id: string;
  init_point: string;
  sandbox_init_point: string;
  items: Array<{
    id: string;
    title: string;
    description: string;
    picture_url: string;
    category_id: string;
    quantity: number;
    currency_id: string;
    unit_price: number;
  }>;
  payer: {
    name: string;
    surname: string;
    email: string;
    phone: {
      area_code: string;
      number: string;
    };
    identification: {
      type: string;
      number: string;
    };
    address: {
      zip_code: string;
      street_name: string;
      street_number: number;
    };
  };
  payment_methods: {
    excluded_payment_methods: Array<{
      id: string;
    }>;
    excluded_payment_types: Array<{
      id: string;
    }>;
    installments: number | null;
    default_installments: number | null;
  };
  back_urls: {
    success: string;
    failure: string;
    pending: string;
  };
  auto_return: string;
  notification_url: string;
  external_reference: string;
  expires: boolean;
  expiration_date_from: string | null;
  expiration_date_to: string | null;
  date_of_expiration: string | null;
  differential_pricing: any;
  operations: Array<any>;
  site_id: string;
  sponsorship: any;
  binary_mode: boolean;
}

export interface MercadoPagoPayment {
  id: number;
  date_created: string;
  date_approved: string | null;
  date_last_updated: string;
  date_of_expiration: string | null;
  money_release_date: string | null;
  operation_type: string;
  payment_method_id: string;
  payment_type_id: string;
  status: string;
  status_detail: string;
  currency_id: string;
  transaction_amount: number;
  net_received_amount: number;
  total_paid_amount: number;
  installments: number;
  order: {
    id: string;
    type: string;
  };
  external_reference: string;
  description: string;
  collector_id: number;
  payer: {
    id: number;
    email: string;
    identification: {
      type: string;
      number: string;
    };
    first_name: string;
    last_name: string;
  };
  metadata: any;
  binary_mode: boolean;
  taxes: Array<any>;
  coupon_amount: number;
  coupon_fee: number;
  discount_fee: number;
  application_date: string;
  shipping_cost: number;
  total_amount_with_shipping: number;
  statement_descriptor: string;
  payment_method_option_id: string;
  integrator_id: string | null;
  platform_id: string | null;
  corporation_id: string | null;
  processing_mode: string;
  merchant_account_id: number;
  merchant_number: string | null;
}

export interface MercadoPagoItem {
  id: string;
  title: string;
  description: string;
  picture_url: string;
  category_id: string;
  quantity: number;
  currency_id: string;
  unit_price: number;
}

export const MERCADO_PAGO_CONFIG = {
  publicKey: process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY || 'TEST-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || 'TEST-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  baseUrl: 'https://api.mercadopago.com',
  CURRENCY_ID: 'PEN',
  PREFERENCE_CONFIG: {
    auto_return: 'approved',
    back_urls: {
      success: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/payment/success`,
      failure: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/payment/failure`,
      pending: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/payment/pending`,
    },
    payment_methods: {
      excluded_payment_types: [],
      installments: 12,
    },
  },
};
