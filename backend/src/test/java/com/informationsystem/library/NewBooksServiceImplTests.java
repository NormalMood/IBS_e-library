package com.informationsystem.library;

import com.informationsystem.library.entity.VGenres;
import com.informationsystem.library.repository.BooksGenresRepository;
import com.informationsystem.library.repository.BooksRepository;
import com.informationsystem.library.repository.VGenresRepository;
import com.informationsystem.library.service.NewBooksService;
import com.informationsystem.library.service.NewBooksServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.assertj.core.api.Java6Assertions.assertThat;
import com.informationsystem.library.dto.response.ObjectResponseDTO;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

@ExtendWith(MockitoExtension.class)
public class NewBooksServiceImplTests {

    @MockBean
    private VGenresRepository vGenresRepository;

    @MockBean
    private BooksRepository booksRepository;

    @MockBean
    private BooksGenresRepository booksGenresRepository;

   // @Spy
    private NewBooksServiceImpl newBooksService = new NewBooksServiceImpl(vGenresRepository, booksRepository, booksGenresRepository);;

    @BeforeEach
    void initUseCase() {
        newBooksService = new NewBooksServiceImpl(vGenresRepository, booksRepository, booksGenresRepository);
    }

    @Test
    public void saveGenres_Success() {
        List<String> genres = new ArrayList<String>() {{
            add("Роман");
            add("Поэзия");
            add("Проза");
        }};
     //   newBooksService.saveGenres(genres);
       // assertThat(vGenresRepository.count() == 3);
    }

    @Test
    public void getAllGenres_Success(){
        List<String> genres = new ArrayList<String>() {{
            add("Роман");
            add("Поэзия");
            add("Проза");
        }};
        int pageNum = 0;
        int elementsPerPage = 10;
       // newBooksService.saveGenres(genres);
    //    vGenresRepository.save(new VGenres(genres.get(0)));
     /*   vGenresRepository.save(new VGenres(genres.get(1)));
        vGenresRepository.save(new VGenres(genres.get(2)));
        newBooksService.saveGenres(genres);*/
       // when(vGenresRepository.findAll(PageRequest.of(pageNum, elementsPerPage))).thenReturn(vGenres);
     //   assertThat(vGenresRepository.count() == 3);
        //Page<VGenres> s = vGenresRepository.findAll(PageRequest.of(0, 10));
//        ObjectResponseDTO genresResponse = newBooksService.getAllGenres(0, 10);
//        List<VGenres> savedGenres = (List<VGenres>) genresResponse.getObjects();
//        assertThat(savedGenres.get(0).getGenre().equals(genres.get(0)));
//        assertThat(savedGenres.get(1).getGenre().equals(genres.get(1)));
//        assertThat(savedGenres.get(2).getGenre().equals(genres.get(2)));
    }

}
