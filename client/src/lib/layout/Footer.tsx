function Footer() {
    return (
        <footer className="w-full bg-card p-4 flex items-center justify-center">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} GeoDashboard. All rights reserved.</p>
        </footer>
    );
}

export default Footer;