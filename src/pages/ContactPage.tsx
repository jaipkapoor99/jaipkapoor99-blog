import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Github, Linkedin, Mail, XIcon, Instagram } from "lucide-react";

type ContactLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const links: ContactLink[] = [
  {
    label: "Email",
    href: "mailto:jaipkapoor99@gmail.com",
    icon: <Mail className="size-5" />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jaipkapoor99/",
    icon: <Linkedin className="size-5" />,
  },
  {
    label: "GitHub",
    href: "https://github.com/jaipkapoor99",
    icon: <Github className="size-5" />,
  },
  {
    label: "Twitter/X",
    href: "https://x.com/jaipkapoor99",
    icon: <XIcon className="size-5" />,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/thesubversivewriter",
    icon: <Instagram className="size-5" />,
  },
];

const ContactPage: React.FC = () => {
  return (
    <div className="mx-auto p-4 max-w-3xl">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Contact Me</h1>
      <p className="text-center mb-6 text-gray-600">
        I’d love to connect. Choose a platform below:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {links.map((item) => (
          <Card key={item.label} className="bg-white border-gray-200 hover:border-pink-primary/40 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                {item.icon}
                {item.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button asChild variant="default" className="w-full">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open {item.label}
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer note removed now that links are set */}
    </div>
  );
};

export default ContactPage;
