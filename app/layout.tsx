import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import { siteConfig } from '@/config/site';
import { fontSans } from '@/config/fonts';
import { Providers } from './providers';
import { Navbar } from '@/components/navbar';
import { Link } from '@nextui-org/link';
import clsx from 'clsx';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE+klEQVR4nO1Y3W8UVRT/PYnI55NIAkaQCIlEHwD/DAsYmvKv6JMItPqgPkFbpG26vbdlYzT6UNls70waaQuNEb8SpYrbubNl2c7cbrEfSxvDmDPdfu3c2b3dbTQxe5KTbDZ3zjm/c+75uAdoUIMa1KAGNciAvM+wR3JclAydLsO4ZJh2OZZdhqf0W3KMSY52l+EdOhv5/g72KIGLvsANZWHcF5j2BZZLPK0s3PMtdCobLXQW20WTCRyUDNclw4LLEZiwZJhzOa45DEenh3HQt3BdWVhQFgJDXiCgeRvHajZ8YhA7XI5LkmPe1PAIM/yd+wrLvrnhwUYuRactGMSOLRmfSeIlyTFas+FlnE0i8NK1gVAExMLI4yEcMDJeDuCkZJDbZfwaiFsIvFQdIASksnGyuucrGc+gXIabTh+asgkcz/ViV6Ybz2f7cdjheNthYA7Hs9jc6Mcz7zaSnoUmT+B4LoVdxPTbs3FWWejyBWYqRMKJjQQZEnttGBZdjssTCeyNjdwodmYH8fPEFwj+GEDg9seA4Lj/SxLPxcmZSWOfsnBVCSzGXSdtTlDCxhifdRhOVbl5UBYukQJPIMh+g+BBMvS4FoTD8F41eZ6N08pCNgZEa7RU6qoNQ9ZN4FA1ZVQqlYX5jUoepRA8+Bx5yeHoIprpxyvV5Po2DulA+BaWZgVeXTtIdV6nxMTzoaKVOr/ZUwKLnoVTLscbLsOSpld8YiLbS+OMEihqQHSud1h9k7psZPwg9sY0qQ9Wz7gc72scNJtPYrehg1o18ufzNnaDxgNdtXmYxD4T4TQeaLyjKBlXz5Asl+OJJgpnTXQUbOzXVieBZro+nRoAN00Eh95ZmW3KvRP5PpyTohXpU1M9SqBb46gO0GAWqRJ9aDIWbGG8XDDV+fJzbh/OawCMmerxh3BOE4G75Bkv0jX78ZqxYAGvXPB0Ovr9ZC+OaABMmuqhZqeJdB66CmGaXCEAC0vlgsPkKqOpr/GCJgcWTPWQTM0VevqvASCZmgjMG+tZqXZRAP/lFXIZMvVfIY57tZY3InpJRZLYjn5PL7W6kljgvCaJx/RllKPLWDA9A6Oe6TIqo8ysGxMpgR7NiN1OAFrqamQ2WjSCZ8obmeT4q9ZyXVhpZAVNBC7EjhKS44pxdRCY0wi/UmXSLWxhlPgodpQoKbihUVB0OE7X3I0FijQS/9mLN2OGuY+NZA/hrZhhrmPtkOzFsXBFUuM4TdsDeoBrvJT9sQPfZxK1jdNqGIeVhSld+SwM48imw5KjTROFEIRM4ExVTwm0aQAEudvI3W/HxERP6PVVme8aed6KGl9+PTetUSTDiBYER1FytGa6sT9OIT3z6LmnU+inUfy1F6M/deDJ7z34odKTsrCSsB+Sl7WyBL4N4r5/yHFAMs0Lap1nXI5uyXFuiuEEJaFMYudUEi/To94dwDWV1j8DwwaXQuHRIG7RYObZOEFJSEy/w2FNoEdbbdavzmQuhRdN1iqVQFTj3yqBqJV9C44SeL3KzdsQCY47dYCYzKfw3TYaP2K82CrLiau6EmjIxakvIXTD3hYMX6KEjb3zJkQLWsnRsZUd6cbl7mwaR0vjxqatRUUWmKM6HymV9RAlbJajmWYayXBXcuTD6NB6nYfrk7X1uq7Dljp2M80v9JKiSdK3sFSKUJ7+C7cbAhdoW7dthjeoQQ1qUIP+1/QPQC8bH+DadogAAAAASUVORK5CYII=',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'white' }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full flex items-center justify-center py-3">
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="#"
                title="ivanyjoanna.com"
              >
                <span className="text-default-600">Direct contact to </span>
                <p className="text-primary">info@ivanyjoanna.com</p>
              </Link>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
