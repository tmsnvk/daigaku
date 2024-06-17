package net.tamasnovak.services.documentGenerator.pdf;

import org.springframework.stereotype.Service;

@Service
public class PdfServiceConstants {
  final String StudentApplicationsTemplate =
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
        %s
      </body>
      </html>
    """;
  final String SingleApplicationData =
    """
      <section>
        <p>%s</p>
        <p>%s</p>
      </section>
    """;
}
