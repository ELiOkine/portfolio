export const site = {
  name: 'Emmanuel Okine',
  role: 'Software Engineer & UI/UX Designer',
  email: 'emmanuelokine452@gmail.com',
  location: 'Accra, Ghana',
  available: true,
  resume: '/resume.pdf',
  resumeFilename: "Emmanuel Okine's Resume.pdf",
  socials: {
    github: 'https://github.com/ELiOkine',
    linkedin: 'https://www.linkedin.com/in/emmanuel-okine-75b47a22b/',
  },
} as const;

export const mailto = `mailto:${site.email}`;
