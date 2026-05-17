import React from 'react';
import { FileText, Mail, MessageCircle } from 'lucide-react';

export default function Policy() {
    const sections = [
        {
            title: "1. Services",
            content: "Framely provides website design, development, and maintenance services for small businesses. The exact scope of work for each project is agreed upon between both parties before work begins and is outlined in the project brief shared via email or WhatsApp."
        },
        {
            title: "2. Payment Terms",
            content: "All projects require a 50% advance payment before work begins. The remaining 50% is due upon completion of the website and before the final files or live deployment are handed over. Maintenance plans are billed monthly and payment is due at the start of each month. We accept payments via UPI, bank transfer, and other mutually agreed methods."
        },
        {
            title: "3. Revisions",
            content: "Each package includes a set number of revisions as discussed during the briefing. Starter includes up to 2 rounds of revisions, Standard includes up to 3 rounds, and Premium includes up to 5 rounds. Additional revisions beyond the included rounds will be billed at ₹500 per round."
        },
        {
            title: "4. Timeline",
            content: "Estimated delivery timelines are shared at the start of each project. Timelines may be affected if the client delays providing content such as text, images, or feedback. Framely is not responsible for delays caused by the client's slow response."
        },
        {
            title: "5. Content Responsibility",
            content: "The client is responsible for providing accurate and legally owned content including text, logos, photographs, and other materials. Framely is not liable for any copyright issues arising from client-provided content."
        },
        {
            title: "6. Domain and Hosting",
            content: "Domain registration and hosting costs are separate from our design fees and are paid directly by the client. If Framely purchases these on the client's behalf, the exact cost is passed on with no hidden markup unless a convenience fee has been agreed upon."
        },
        {
            title: "7. Ownership",
            content: "Upon receipt of full payment, the client owns the completed website. Until final payment is received, Framely retains the right to withhold delivery of files or take down the preview link."
        },
        {
            title: "8. Maintenance Plans",
            content: "Monthly maintenance plans can be cancelled with 15 days written notice before the next billing cycle. No refunds are issued for a partially used month."
        },
        {
            title: "9. Refunds",
            content: "The advance payment is non-refundable once work has begun. If Framely is unable to deliver the agreed website for any reason on our end, the advance will be refunded in full."
        },
        {
            title: "10. Confidentiality",
            content: "Both parties agree to keep all project-related information and communications confidential. Framely may feature completed websites in our portfolio unless the client specifically requests otherwise in writing."
        },
        {
            title: "11. Limitation of Liability",
            content: "Framely is not liable for any indirect losses, lost revenue, or damages arising from the use or inability to use the delivered website. Our total liability in any case does not exceed the amount paid for the specific project."
        },
        {
            title: "12. Changes to Terms",
            content: "Framely reserves the right to update these terms at any time. Continued engagement with our services after changes constitutes acceptance of the new terms."
        }
    ];

    return (
        <div className="min-h-screen bg-background text-foreground py-20">
            <div className="container">
                {/* Hero Section - Matching About Page */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                        <FileText className="text-primary w-8 h-8" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Terms and Conditions</h1>
                    <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
                        Last updated: May 18, 2026. Please read these terms carefully to understand our mutual commitments.
                    </p>
                </div>

                {/* Content Grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-20">
                    {sections.map((section, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-8 border border-border hover:shadow-lg transition-all duration-300 flex flex-col"
                        >
                            <h2 className="text-xl font-display font-bold mb-4 text-primary">
                                {section.title}
                            </h2>
                            <p className="text-foreground/70 text-sm leading-relaxed flex-grow">
                                {section.content}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Contact Section - Matching About Page Style */}
                <section className="bg-primary/10 border border-primary rounded-2xl p-8 lg:p-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Have Questions?</h2>
                    <p className="text-foreground/70 max-w-2xl mx-auto mb-10 leading-relaxed">
                        If you have any questions regarding these terms, please reach out to us. We're here to help you get your business online smoothly.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="mailto:hello@framely.in"
                            className="flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold hover:opacity-90 transition-all w-full sm:w-auto justify-center"
                        >
                            <Mail size={20} />
                            Email Us
                        </a>
                        <a
                            href="https://wa.me/yournumber"
                            className="flex items-center gap-2 px-8 py-4 border border-primary text-primary rounded-full font-bold hover:bg-primary/5 transition-all w-full sm:w-auto justify-center"
                        >
                            <MessageCircle size={20} />
                            WhatsApp Support
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
}
