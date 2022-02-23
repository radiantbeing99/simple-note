package simple.simplenote.domain.contents;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@Getter @Setter
@DiscriminatorValue("Text")
public class Text extends Card {

    @Column(length = 10000)
    private String description;

    @Override
    public String toString() {
        return "Text{" +
                "description='" + description + '\'' +
                '}';
    }
}
