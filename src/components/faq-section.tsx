/* import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"; */


  const faqData = [
    {
      id: "item-1",
      question: "How do I create a QR code?",
      answer: `Creating a QR code with TrackQrPro is simple. Log in to your account, navigate to the QR code generator
        in your dashboard, and follow the step-by-step process. You can customize your QR code's design and link
        it to your desired destination (URL, text, contact info, etc.).`,
    },
    {
      id: "item-2",
      question: "What data do you track?",
      answer: `TrackQrPro tracks comprehensive data for each QR code scan, including:
        <ul class="list-disc list-inside mt-2">
          <li>Date and time of the scan</li>
          <li>Device type (mobile, tablet, desktop)</li>
          <li>Operating system and browser</li>
          <li>Geographic location (country, city)</li>
          <li>Referrer URL (if applicable)</li>
        </ul>
        All data is collected in compliance with privacy laws and our privacy policy.`,
    },
    {
      id: "item-3",
      question: "Can I upgrade my plan later?",
      answer: `Yes, you can upgrade your plan at any time. Simply go to your account settings, select the 'Subscription'
        tab, and choose the plan that best fits your needs. Your new plan will be activated immediately, and
        you'll only be charged the difference for the remainder of your billing cycle.`,
    },
    {
      id: "item-4",
      question: "Is there a limit to how many QR codes I can create?",
      answer: `The number of QR codes you can create depends on your subscription plan. Our Basic plan allows for up to
        10 QR codes, while in Pro 50 QR codes and Enterprise plans offer unlimited QR code creation. Check our pricing page
        for detailed information on each plan's features.`,
    },   
    {
      id: "item-5",
      question: "Can I customize the appearance of my QR codes?",
      answer: `TrackQrPro offers a range of customization options for your QR codes. You can change colors,
        add your logo, choose different patterns, and even create branded templates. This allows you to make QR
        codes that align with your brand identity while ensuring they remain scannable.`,
    },
  ];
  
  
  export default function FAQSection() {
    return (
      <section id="faq" className="py-16 bg-indigo-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-indigo-900">
            Frequently Asked Questions
          </h2>
{/*           <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            {faqData.map(({ id, question, answer }) => (
              <AccordionItem key={id} value={id}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent>
                  <div dangerouslySetInnerHTML={{ __html: answer }} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion> */}
        </div>
      </section>
    );
  }
  