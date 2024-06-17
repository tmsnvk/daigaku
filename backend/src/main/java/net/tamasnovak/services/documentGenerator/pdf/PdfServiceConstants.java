package net.tamasnovak.services.documentGenerator.pdf;

import org.springframework.stereotype.Service;

@Service
public class PdfServiceConstants {
  final String StudentApplicationsCentralTemplate =
    """
      <html>
      <head>
        <style>
          body {
            color: blue;
            font-size: 20px;
          }
        </style>
      <head>
      <body>
        <main>
          %s
          %s
        </main>
        <footer>
          <p>The document was generated on %s at %s.</p>
        </footer>
      </body>
      </html>
    """;
  final String StudentDataChunk =
    """
      <section>
        <p>Name: <span>%s</span></p>
        <p>Email: <span>%s</span></p>
        <p>Institution: <span>%s</span></p>
      </section>
    """;
  final String SingleApplicationDataChunk =
    """
      <section>
        <p>%s</p>
        <p>%s</p>
      </section>
    """;
}
