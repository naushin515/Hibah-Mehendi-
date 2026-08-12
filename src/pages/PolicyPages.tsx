import { privacyPolicy, termsConditions, shippingPolicy, returnPolicy } from '../data/policies'

function PolicyPage({ content }: { content: string }) {
  return (
    <div className="container-app py-12">
      <div className="prose prose-stone mx-auto max-w-3xl dark:prose-invert" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

export function PrivacyPolicyPage() {
  return <PolicyPage content={privacyPolicy} />
}

export function TermsPage() {
  return <PolicyPage content={termsConditions} />
}

export function ShippingPolicyPage() {
  return <PolicyPage content={shippingPolicy} />
}

export function ReturnPolicyPage() {
  return <PolicyPage content={returnPolicy} />
}
