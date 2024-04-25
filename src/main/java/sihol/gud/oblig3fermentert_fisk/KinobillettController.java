package sihol.gud.oblig3fermentert_fisk;

import jakarta.transaction.Transactional;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
public class KinobillettController {
    String base_url = "http://localhost";
    String port = ":8080";
    final
    KinobillettRepository rep;

    public KinobillettController(KinobillettRepository rep) {
        this.rep = rep;
    }

    @CrossOrigin(origins = "http://localhost:63342")
    @Transactional
    @PostMapping("/kinobillett")
    public void lagre(Kinobillett kinobillett){
        rep.save(kinobillett);
    }

    @CrossOrigin(origins = "http://localhost:63342")
    @GetMapping("/kinobillett")
    public List<Kinobillett> hentAlle(){
        return rep.findAll();
    }

    @CrossOrigin(origins = "http://localhost:63342")
    @Transactional
    @DeleteMapping("/kinobillett")
    public void slettAlle() {
        rep.deleteAll();
    }

    @CrossOrigin(origins = "http://localhost:63342")
    @Transactional
    @DeleteMapping ("/kinobillett/{id}")
    public void slettMedId(@PathVariable int id){
        rep.findById(id).ifPresent(rep::delete);
    }
}
