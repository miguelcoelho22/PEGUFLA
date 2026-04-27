package br.ufla.PEGUFLA.infra.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;


@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final ZoneId ZONE_ID = ZoneId.of("America/Sao_Paulo");

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<ErroValidacaoDTO>> tratarErroValidacao(MethodArgumentNotValidException ex) {
        var erros = ex.getFieldErrors();

        return ResponseEntity.badRequest().body(erros.stream().map(ErroValidacaoDTO::new).toList());
    }

    private record ErroValidacaoDTO(String campo, String mensagem) {
        public ErroValidacaoDTO(FieldError erro) {
            this(erro.getField(), erro.getDefaultMessage());
        }
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErroRespostaDTO> tratarErro404(NotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErroRespostaDTO(LocalDateTime.now(ZONE_ID), ex.getMessage(), ""));
    }

    private record ErroRespostaDTO(LocalDateTime timestamp,
                                   String message,
                                   String details) {}

    @ExceptionHandler(ModelException.class)
    public ResponseEntity<ErroRespostaDTO> tratarErroRegraNegocio(ModelException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErroRespostaDTO(LocalDateTime.now(ZONE_ID), ex.getMessage(), ""));
    }
}