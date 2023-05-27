package com.informationsystem.library;


import com.informationsystem.library.entity.VGenres;
import com.informationsystem.library.repository.VGenresRepository;
import com.informationsystem.library.service.NewBooksService;
import com.informationsystem.library.service.NewBooksServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
/*@RunWith(SpringRunner.class)*/
/*@SpringBootTest*/
/*@ContextConfiguration(initializers = {ReadDatabaseTests.Initializer.class})*/
public class ReadDatabaseTests {

/*    @ClassRule
    public static PostgreSQLContainer postgreSQLContainer = new PostgreSQLContainer("postgres")
            .withDatabaseName("library_local_test")
            .withUsername("postgres")
            .withPassword("library");

    static class Initializer
            implements ApplicationContextInitializer<ConfigurableApplicationContext> {
        public void initialize(ConfigurableApplicationContext configurableApplicationContext) {
            TestPropertyValues.of(
                    "spring.datasource.url=" + postgreSQLContainer.getJdbcUrl(),
                    "spring.datasource.username=" + postgreSQLContainer.getUsername(),
                    "spring.datasource.password=" + postgreSQLContainer.getPassword()
            ).applyTo(configurableApplicationContext.getEnvironment());
        }
    }*/

    @InjectMocks
    private NewBooksServiceImpl service;

    @Mock
    private VGenresRepository repository;


    @Test
    public void booksRepository_Test() {
        VGenres genres = new VGenres("123");
        List<VGenres> list = new ArrayList<>();
        list.add(genres);
      //  given(repository.findAll()).willReturn(list);
        List<VGenres> genres1 = service.getAll();
        assertEquals(genres1, list);
    }

}
