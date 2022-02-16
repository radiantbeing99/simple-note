package simple.simplenote.service;

import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import simple.simplenote.domain.CardList;
import simple.simplenote.repository.ListRepository;

import static org.junit.Assert.*;


@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class ListServiceTest {
    @Autowired
    ListRepository listRepository;
    @Autowired
    ListService service;

    @Test
    @Rollback(value = true)
    public void 등록(){
        //given
        CardList cardList = new CardList();
        cardList.setTitle("Test1");

        //when
        listRepository.save(cardList);
        CardList test1 = listRepository.findByTitleName("Test1").get(0);

        //then
        Assertions.assertThat(cardList.getTitle()).isEqualTo(test1.getTitle());
    }

    @Test(expected = IllegalStateException.class)
    @Rollback(value = true)
    public void 중복_등록_테스트(){
        //given
        CardList cardList1 = new CardList();
        cardList1.setTitle("Test1");
        CardList cardList2 = new CardList();
        cardList2.setTitle("Test1");

        //when
        service.add(cardList1);
        service.add(cardList2);

        //then
        fail("예외발생");
    }
}