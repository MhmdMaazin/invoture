"use client";

import Image from "next/image";

// RHF
import { useFormContext } from "react-hook-form";

// ShadCn
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

// Components
import {
    BaseButton,
    InvoiceTemplate1,
    InvoiceTemplate2,
    InvoiceTemplate3,
    InvoiceTemplate4,
    InvoiceTemplate5,
    InvoiceTemplate6,
    InvoiceTemplate7,
} from "@/app/components";

// Template images
import template1 from "@/public/assets/img/invoice-1-example.png";
import template2 from "@/public/assets/img/invoice-2-example.png";
import template3 from "@/public/assets/img/invoice-3-example.png";
import template4 from "@/public/assets/img/invoice-4-example.png";
import template5 from "@/public/assets/img/invoice-5-example.png";
import template6 from "@/public/assets/img/invoice-6-example.png";
import template7 from "@/public/assets/img/invoice-7-example.png";

// Icons
import { Check } from "lucide-react";

// Types
import { InvoiceType } from "@/types";

const TemplateSelector = () => {
    const { watch, setValue } = useFormContext<InvoiceType>();
    const formValues = watch();
    const templates = [
        {
            id: 1,
            name: "Template 1",
            description: "Template 1 description",
            img: template1,
            component: <InvoiceTemplate1 {...formValues} />,
        },
        {
            id: 2,
            name: "Template 2",
            description: "Second template",
            img: template2,
            component: <InvoiceTemplate2 {...formValues} />,
        },
        {
            id: 3,
            name: "Template 3",
            description: "Red sidebar design",
            img: template3,
            component: <InvoiceTemplate3 {...formValues} />,
        },
        {
            id: 4,
            name: "Template 4",
            description: "Colorful circles design",
            img: template4,
            component: <InvoiceTemplate4 {...formValues} />,
        },
        {
            id: 5,
            name: "Template 5",
            description: "Geometric red design",
            img: template5,
            component: <InvoiceTemplate5 {...formValues} />,
        },
        {
            id: 6,
            name: "Template 6",
            description: "Blue corporate design",
            img: template6,
            component: <InvoiceTemplate6 {...formValues} />,
        },
        {
            id: 7,
            name: "Template 7",
            description: "Minimalist gray design",
            img: template7,
            component: <InvoiceTemplate7 {...formValues} />,
        },
    ];
    return (
        <>
            <div>
                <Label>Choose Invoice Template:</Label>

                <div>
                    <Card>
                        <CardHeader>
                            Templates
                            <CardDescription>
                                Select one of the predefined templates
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="">
                            <div className="flex overflow-x-auto">
                                {templates.map((template, idx) => (
                                    <div
                                        key={idx}
                                        className="flex flex-col flex-shrink-0 mr-4 gap-y-3"
                                    >
                                        <p>{template.name}</p>

                                        <div className="relative">
                                            {formValues.details.pdfTemplate ===
                                                template.id && (
                                                <div className="shadow-lg absolute right-2 top-2 rounded-full bg-blue-300 dark:bg-blue-600">
                                                    <Check />
                                                </div>
                                            )}
                                            <Image
                                                src={template.img}
                                                alt={template.name}
                                                width={300}
                                                height={700}
                                                placeholder="blur"
                                                className="cursor-pointer rounded-lg border-2 hover:border-blue-600"
                                                onClick={() =>
                                                    setValue(
                                                        "details.pdfTemplate",
                                                        template.id
                                                    )
                                                }
                                            />
                                            {/* {template.component} */}
                                        </div>

                                        <BaseButton
                                            onClick={() =>
                                                setValue(
                                                    "details.pdfTemplate",
                                                    template.id
                                                )
                                            }
                                        >
                                            Select
                                        </BaseButton>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default TemplateSelector;
