package sihol.gud.oblig3fermentert_fisk;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KinobillettRepository extends JpaRepository<Kinobillett,Integer>{

}
