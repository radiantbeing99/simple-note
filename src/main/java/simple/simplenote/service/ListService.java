package simple.simplenote.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import simple.simplenote.domain.CardList;
import simple.simplenote.repository.ListRepository;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ListService {
    private final ListRepository listRepository;

    @Transactional(readOnly = false)
    public Long add(CardList cardList){
        validateDuplicatedId(cardList);
        listRepository.save(cardList);
        return cardList.getId();
    }

    private void validateDuplicatedId(CardList cardList) {
        List<CardList> idResult = listRepository.findById(cardList.getId());
        List<CardList> titleResult = listRepository.findByTitleName(cardList.getTitle());
        if (!idResult.isEmpty()){
            throw new IllegalStateException("duplicated ID number");
        }

        if (!titleResult.isEmpty()){
            throw new IllegalStateException("duplicated title");
        }
    }
}
