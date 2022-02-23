package simple.simplenote.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import simple.simplenote.domain.contents.Card;
import simple.simplenote.domain.contents.Text;
import simple.simplenote.service.CardService;

import javax.servlet.http.HttpServlet;
import java.time.LocalDateTime;
import java.util.List;

@Controller
@RequestMapping("/api/contents")
@RequiredArgsConstructor
@Transactional(readOnly = true)
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AddFormController extends HttpServlet {

    private final CardService cardService;
    private ObjectMapper objectMapper = new ObjectMapper();


    @Transactional(readOnly = false)
    @GetMapping("/{id}")
    @ResponseBody
    public String showCard(@PathVariable Long id) throws JsonProcessingException {
        List<Card> result = cardService.findById(id);
        String findResult = objectMapper.writeValueAsString(result.get(0));

        return findResult;
    }

    @ResponseBody
    @GetMapping("/max_contents")
    public String showMaxContent() {
        int maxSize = cardService.findAll().size();

        return maxSize + "";
    }

    /**
     * contentToc[
     * {id:1,
     * title:aaaaa},
     * ]
     *
     * @return
     */
    @ResponseBody
    @GetMapping("/toc")
    public String showArray() throws JsonProcessingException {
        List<Card> result = cardService.findAll();
        StringBuilder sb = new StringBuilder();
        sb.append("{\"contentsTOC\":[");

        for (Card card : result) {
            String idResult = objectMapper.writeValueAsString(card.getId());
            sb.append("{\"id\":" + idResult + ",");
            String titleResult = objectMapper.writeValueAsString(card.getTitle());
            sb.append("\"title\":" + titleResult + "},");
        }

        sb.delete(sb.length() - 1, sb.length());
        sb.append("]}");

        return sb.toString();
    }


    private Text createText(String title, String des) {
        Text text = new Text();
        text.setTitle(title);
        text.setDescription(des);
        cardService.add(text);
        return text;
    }

    @PostMapping("")
    @Transactional(readOnly = false)
    @ResponseBody
    public String getCard(@RequestBody AddForm addForm) throws JsonProcessingException {
        Text text = new Text();
        text.setId(Long.valueOf(addForm.getId()));
        text.setTitle(addForm.getTitle());
        text.setDescription(addForm.getDescription());

        cardService.add(text);

        return objectMapper.writeValueAsString(new StatusForm("Good Received"));
    }



//    @Transactional(readOnly = false)
//    @PostMapping("/create")
//    public void getCard(@ModelAttribute AddForm addForm) throws JsonProcessingException {
//        System.out.println("AddFormController.getCard");
//        Text text = new Text();
//        text.setTitle(addForm.getTitle());
//        text.setDescription(addForm.getDescription());
//
//        System.out.println("text.getTitle() = " + text.getTitle());
//        System.out.println("text.getDescription() = " + text.getDescription());
//        cardService.add(text);
//    }

}
