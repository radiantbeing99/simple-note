package simple.simplenote.domain;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class CardList {

    @Id @GeneratedValue
    @Column(name = "card_list_id")
    private Long id;
    private String title;
    private LocalDateTime localDateTime;
    private String theme;

}
