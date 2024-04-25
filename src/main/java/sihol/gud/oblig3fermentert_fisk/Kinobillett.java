package sihol.gud.oblig3fermentert_fisk;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Kinobillett")
public class Kinobillett {
    @Id
    @GeneratedValue
    private Integer id;
    private String alternativer;

    private Integer antall;

    private String fornavn;

    private String etternavn;

    private Integer tlfnummer;

    private String mail;
}