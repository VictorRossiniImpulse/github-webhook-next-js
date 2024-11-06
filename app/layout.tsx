// app/layout.tsx
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children} {/* Certifique-se de que o conteúdo da página é renderizado aqui */}
      </body>
    </html>
  );
}
