'use client';

import CategoryPageLayout from '@/components/shared/CategoryPageLayout';

export default function HealthPage() {
  return (
    <CategoryPageLayout
      title="Health & Wellness"
      title_hi="स्वास्थ्य एवं कल्याण"
      description="Evidence-based guidance on weight loss, diabetes, blood pressure, digestion, immunity, and more."
      description_hi="वजन घटाने, मधुमेह, रक्तचाप, पाचन, प्रतिरक्षा और बहुत कुछ पर साक्ष्य-आधारित मार्गदर्शन।"
      icon="❤️"
      slug="health"
    />
  );
}
