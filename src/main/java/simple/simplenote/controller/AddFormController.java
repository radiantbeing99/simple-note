package simple.simplenote.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import simple.simplenote.domain.contents.Card;
import simple.simplenote.domain.contents.Text;
import simple.simplenote.service.CardService;

import javax.servlet.http.HttpServlet;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Transactional(readOnly = true)
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AddFormController extends HttpServlet {

    private final CardService cardService;
    private ObjectMapper objectMapper = new ObjectMapper();


    @Transactional(readOnly = false)
    @GetMapping("/content/{id}")
    public String addCard(@PathVariable Long id) throws JsonProcessingException {
        List<Card> result = cardService.findById(id);
        String findResult = objectMapper.writeValueAsString(result.get(0));

        System.out.println("AddFormController.addCard");
        return findResult;
    }

    @GetMapping("content/max_contents")
    public String addMaxContent(){
        int maxSize = cardService.findAll().size();

        return maxSize+"";
    }


    private Text createText(String title, String des) {
        Text text = new Text();
        text.setTitle(title);
        text.setDescription(des);
        cardService.add(text);
        return text;
    }

    @PostMapping("/add")
    public void getCard(@ModelAttribute AddForm addForm){

    }

}
