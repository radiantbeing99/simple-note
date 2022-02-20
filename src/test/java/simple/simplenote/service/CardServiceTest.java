package simple.simplenote.service;

import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import simple.simplenote.domain.contents.Card;
import simple.simplenote.domain.contents.CardStatus;
import simple.simplenote.domain.contents.Text;
import simple.simplenote.repository.CardRepository;

import java.util.List;


@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class CardServiceTest {

    @Autowired
    CardRepository cardRepository;

    @Autowired
    CardService cardService;

    @Test
    @Rollback(value = true)
    public void 등록(){
        //given
        Card card = new Text();
        card.setCardStatus(CardStatus.COMPLETE);
        card.setTitle("하하!");
        cardService.add(card);

        //when
        List<Card> findResult = cardRepository.findById(card.getId());

        System.out.println("card = " + card.getTitle());
        //then
        Assertions.assertThat(card.getTitle()).isEqualTo(findResult.get(0).getTitle());
    }

}