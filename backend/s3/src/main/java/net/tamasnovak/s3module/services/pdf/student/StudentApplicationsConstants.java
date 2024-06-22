package net.tamasnovak.s3module.services.pdf.student;

import org.springframework.stereotype.Service;

@Service
public class StudentApplicationsConstants {
  final String STUDENT_APPLICATION_HTML_MAIN_TEMPLATE =
    """
      <html>
      <head>
        <style>
          * {
            border: 0;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            --light-blue: #C9D7DD;
          }

          *:before,
          *:after {
            box-sizing: border-box;
          }

          html {
            font-size: 62.5%%;
            line-height: 1.5;
          }

          @page {
            size: A4 portrait;
            margin: 15mm;
          }

          body {
            font-size: 1.2rem;
            font-family: Helvetica, serif;
          }

          header {
            padding: 1.5rem 0 1.5rem 5rem;
          }

          header h1 {
            font-size: 2.5rem;
          }

          .student-data:after {
            content: '';
            display: block;
            width: 66%%;
            margin: 2.5rem auto 2.5rem auto;
            border-bottom: 0.25rem solid var(--light-blue);
          }

          .student-data p,
          .application-data p {
            padding: 0.25rem 0 0.25rem 5rem;
            font-weight: 800;
          }

          .student-data span,
          .application-data span {
            font-weight: 400;
          }

          .application-data > div {
            display: flex;
            flex-direction: row;
            padding: 0.25rem 0 0.25rem 0;
          }

          .application-data:after {
            content: '';
            display: block;
            width: 33%%;
            margin: 2.5rem auto 2.5rem auto;
            border-bottom: 0.25rem solid var(--light-blue);
          }
        </style>
      <head>
      <body>
        <header>
          <h1>Daigaku - Applications</h1>
          <p>The document was generated on %s at %s.</p>
        </header>
        <main>
          %s
          %s
        </main>
      </body>
      </html>
    """;
  final String STUDENT_HTML_STUDENT_DATA =
    """
      <section class="student-data">
        <p>Name: <span>%s</span></p>
        <p>Email: <span>%s</span></p>
        <p>Institution: <span>%s</span></p>
      </section>
    """;
  final String STUDENT_HTML_APPLICATIONS_DATA =
    """
      <section class="application-data">
        <div>
          <div>
            <article>
              <p>Submitted at: <span>%s</span></p>
              <p>Last updated at: <span>%s</span></p>
            </article>
            <article>
              <p>Course name: <span>%s</span></p>
              <p>University: <span>%s</span></p>
              <p>Country: <span>%s</span></p>
            </article>
          </div>
          <article>
            <p>Application Status: <span>%s</span></p>
            <p>Interview Status: <span>%s</span></p>
            <p>Offer Status: <span>%s</span></p>
            <p>Response Status: <span>%s</span></p>
            <p>Final Destination Status: <span>%s</span></p>
          </article>
        </div>
      </section>
    """;
}
