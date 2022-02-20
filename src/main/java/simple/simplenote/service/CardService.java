package simple.simplenote.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import simple.simplenote.domain.contents.Card;
import simple.simplenote.repository.CardRepository;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CardService {

    private final CardRepository cardRepository;


    @Transactional(readOnly = false)
    public String add(Card card){
        validateDuplicatedTitle(card);
        cardRepository.save(card);
        return card.getTitle();
    }

    private void validateDuplicatedTitle(Card card) {
        List<Card> result = cardRepository.findById(card.getId());
        if (!result.isEmpty()){
            throw new IllegalStateException("duplicated Title!");
        }

    }
}
