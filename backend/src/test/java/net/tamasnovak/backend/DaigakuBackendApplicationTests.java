package net.tamasnovak.backend;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
class DaigakuBackendApplicationTests {
//  @Test
  void contextLoads(ApplicationContext context) {
    assertThat(context).isNotNull();
  }
}
