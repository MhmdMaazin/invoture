import React from "react";

// Next
import Link from "next/link";

// ShadCn
import { Button } from "@/components/ui/button";

type TemplateQuickLinksProps = {
	maxTemplates?: number;
	className?: string;
};

const TemplateQuickLinks = ({ maxTemplates = 7, className }: TemplateQuickLinksProps) => {
	const templates = Array.from({ length: maxTemplates }, (_, i) => i + 1);

	return (
		<div className={`flex items-center gap-1 ${className ?? ""}`}>
			{templates.map((num) => (
				<Button key={num} variant="ghost" size="sm" asChild>
					<Link href={`/template/${num}`} aria-label={`Template ${num}`}>
						{`T${num}`}
					</Link>
				</Button>
			))}
		</div>
	);
};

export default TemplateQuickLinks;


