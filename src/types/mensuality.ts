export interface MensualityPostType {
  name: string;
  price: string;
  category: string;
}

export interface MensualityPatchType {
  name: string;
  price: string;
  category: string;
  id: string;
}

export interface MensualityGetType {
  name: string;
  price: string;
  category: { image: string; name: string; id: string };
  id: string;
}

export interface MensualityResponseGet {
  message: string;
  mensualities: MensualityGetType[];
}
