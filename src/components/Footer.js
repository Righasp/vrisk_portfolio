export default function Footer() {
    return (
        <footer>
            <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
            <nav>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="problem-statement.html">Problem Statement</a></li>
                    <li><a href="methodology.html">Methodology</a></li>
                    <li><a href="implementation.html">Implementation</a></li>
                    <li><a href="progress.html">Progress</a></li>
                    <li><a href="team.html">Team</a></li>
                </ul>
            </nav>
        </footer>
    );
}