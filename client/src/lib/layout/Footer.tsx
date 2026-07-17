function Footer() {
    return (
        <footer className="w-full bg-card p-4 flex flex-col items-center justify-center font-michroma">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} GeoDashboard All rights reserved</p>
            <p className='text-primary'>made with Creativity by <a className="text-primary underline hover:text-amber-600 transition-colors duration-200 animate-pulse" href="https://wesamlt.netlify.app" target="_blank" rel="noopener noreferrer">Wesam</a></p>
        </footer>
    );
}

export default Footer;