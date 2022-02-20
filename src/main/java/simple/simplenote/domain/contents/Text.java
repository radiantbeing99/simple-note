package simple.simplenote.domain.contents;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@Getter @Setter
@DiscriminatorValue("Text")
public class Text extends Card {
    private String contents;
}
